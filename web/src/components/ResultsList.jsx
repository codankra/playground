/**
 * @typedef {{list: Map<number,string>}} ResultsListProps
 */

/**
 *
 * @param {ResultsListProps} props
 * @returns
 */
function ResultsList({ list }) {
  let arr = [];
  for (let i = 0; i < list.size; i++) {
    arr.push(<li>{list.get(i)}</li>);
  }

  return <ol start="0">{arr}</ol>;
}
export default ResultsList;
