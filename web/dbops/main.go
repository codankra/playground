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

const (  
    username = "grw1xsomld7i"
    hostname = "agk7y5afa28m.us-east-1.psdb.cloud"
    dbname   = "caeser"
)
func dsn(pw string) string {  
    return fmt.Sprintf("%s:%s@tcp(%s)/%s?tls=true", username, pw, hostname, dbname)
}


func main() {  
	pass :=  os.Getenv("dbpass")
    db, err := sql.Open("mysql", dsn(pass))
    if err != nil {
        log.Printf("Error %s when opening DB\n", err)
        return
    }
    defer db.Close()
	db.SetMaxOpenConns(20)
    db.SetMaxIdleConns(20)
    db.SetConnMaxLifetime(time.Minute * 5)
	ctx, cancelfunc := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelfunc()
	
	err = db.PingContext(ctx)
    if err != nil {
        log.Printf("Errors %s pinging DB", err)
        return
    }
    log.Printf("Connected to DB %s successfully\n", dbname)
}