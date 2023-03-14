import styles from "./index.less";
import { Pagination, Loading, Empty } from "@/components/Ui";
import { stylePxToVw } from "@/utils";

import { useIntl } from "react-intl";

export default (props) => {
  const intl = useIntl();
  const {
    dataSource = [],
    columns = [],
    loading = false,
    pagination = {},
    onChange = null,
    emptyText = intl.$t({ id: "NO_DATA" }),
  } = props;

  const renderTh = (name, dataIndex, style = {}) => {
    return (
      <th className={styles.table_cell} key={dataIndex} style={style}>
        {name}
      </th>
    );
  };

  const renderTd = (name, dataIndex, style = {}) => {
    return (
      <th className={styles.table_cell} key={dataIndex} style={style}>
        {name}
      </th>
    );
  };

  const renderCol = (width = "", dataIndex) =>
    width ? (
      <col style={{ width: stylePxToVw(width) }} key={dataIndex}></col>
    ) : (
      <col key={dataIndex}></col>
    );
  return (
    <div className={styles.table}>
      {loading ? (
        <Loading />
      ) : dataSource.length > 0 ? (
        <div className={styles.table_wrap}>
          <div className={styles.table_content}>
            <table>
              <colgroup>
                {columns.map((item) => renderCol(item.width, item.dataIndex))}
              </colgroup>
              <thead className={styles.table_thead}>
                <tr>
                  {columns.map((item) => renderTh(item.title, item.dataIndex))}
                </tr>
              </thead>
              <tbody className={styles.table_tbody}>
                {dataSource.map((item, index) => (
                  <tr className={styles.table_row} key={index}>
                    {columns.map((_item) =>
                      renderTd(
                        _item.render
                          ? _item.render(item[_item.dataIndex], item)
                          : item[_item.dataIndex],
                        _item.dataIndex,
                        { textAlign: _item.align },
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <Pagination
              current={pagination.page}
              pageSize={pagination.limit}
              total={pagination.total}
              onChange={onChange}
            />
          </div>
        </div>
      ) : (
        <Empty text={emptyText} />
      )}
    </div>
  );
};
