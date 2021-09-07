package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type query struct {  
    text string
	num int
	first_searched time.Time
	latest_searched time.Time
}

const (  
    username = "grw1xsomld7i"
    hostname = "agk7y5afa28m.us-east-1.psdb.cloud"
    dbname   = "caeser"
)



func dsn(pw string) string {  
    return fmt.Sprintf("%s:%s@tcp(%s)/%s?tls=true", username, pw, hostname, dbname)
}

func dbConnection() (*sql.DB, error) {
	pass :=  os.Getenv("dbpass")
	db, err := sql.Open("mysql", dsn(pass))
	if err != nil {
		log.Printf("Error %s when opening DB", err)
		return nil, err
	}
	//defer db.Close()

	db.SetMaxOpenConns(20)
	db.SetMaxIdleConns(20)
	db.SetConnMaxLifetime(time.Minute * 5)

	ctx, cancelfunc := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelfunc()
	err = db.PingContext(ctx)
	if err != nil {
		log.Printf("Errors %s pinging DB", err)
		return nil, err
	}
	log.Printf("Connected to DB %s successfully\n", dbname)
	return db, nil
}

func createQueryTable(db *sql.DB) error {
	query := `CREATE TABLE IF NOT EXISTS queries(query_text varchar(100) primary key, 
		query_num int, first_searched datetime default CURRENT_TIMESTAMP, latest_searched datetime default CURRENT_TIMESTAMP)`
	ctx, cancelfunc := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelfunc()
	res, err := db.ExecContext(ctx, query)
	if err != nil {
		log.Printf("Error %s when creating query table", err)
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		log.Printf("Error %s when getting rows affected", err)
		return err
	}
	log.Printf("Rows affected when creating table: %d", rows)
	return nil
}

func dropQueryTable(db *sql.DB) error {
	query := `DROP TABLE queries`
	ctx, cancelfunc := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelfunc()
	res, err := db.ExecContext(ctx, query)
	if err != nil {
		log.Printf("Error %s when dropping query table", err)
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		log.Printf("Error %s when getting rows affected", err)
		return err
	}
	log.Printf("Rows affected when dropping table: %d", rows)
	return nil
}


func insertQuery(db *sql.DB, q query) error {  
    query := "INSERT INTO queries(query_text, query_num, first_searched, latest_searched) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE query_num=query_num + 1, latest_searched=VALUES(latest_searched)"
    ctx, cancelfunc := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancelfunc()
    stmt, err := db.PrepareContext(ctx, query)
    if err != nil {
        log.Printf("Error %s when preparing SQL statement", err)
        return err
    }
    defer stmt.Close()
    res, err := stmt.ExecContext(ctx, q.text, 1, time.Now(), time.Now())
    if err != nil {
        log.Printf("Error %s when inserting row into queries table", err)
        return err
    }
    rows, err := res.RowsAffected()
    if err != nil {
        log.Printf("Error %s when finding rows affected", err)
        return err
    }
	if (rows == 1){
		log.Printf("New query created")
	} else if (rows == 2){
		log.Printf("Query affected: %s", q.text)
	}
	return nil
}

func selectQuery(db *sql.DB, q query) []int {  
	res, err := db.Query("SELECT query_text, query_num FROM queries")
    defer res.Close()

    if err != nil {
        log.Fatal(err)
    }
	values_exist := false
	var basic []int
    for res.Next() {
		values_exist = true
		var q query
        err := res.Scan(&q.text, &q.num)

        if err != nil {
            log.Fatal(err)
        }

        fmt.Printf("%v\n", q)
		basic = append(basic, q.num)
    } 
	if values_exist == false {
        fmt.Println("No query found")
		
    }
	return basic
}



func doitall() {  
	db, err := dbConnection()
	if err != nil {
		log.Printf("Error %s when getting db connection", err)
		return
	}
	defer db.Close()
	log.Printf("Successfully connected to database")
	err = createQueryTable(db)
	if err != nil {
        log.Printf("Create query table failed with error %s", err)
        return
    }

	// err = dropQueryTable(db)
	// if err != nil {
    //     log.Printf("Drop query table failed with error %s", err)
    //     return
    // }

	q:= query{
		text: "firstquery",
	}
	err = insertQuery(db, q)  
	if err != nil {  
		log.Printf("Insert query failed with error %s", err)
		return
	}

	qnum := selectQuery(db, q)  
	log.Printf("Select query %s succeeded with value %d", q.text, qnum)


}
