import styles from "./index.less";

export default (props) => {
  const {
    current = 1,
    pageSize = 10,
    total = 0,
    elevatorSize = 10,
    onChange,
  } = props;
  const itemCount = Math.ceil(total / pageSize);

  function handlePageChange(page) {
    onChange && onChange(page, pageSize);
  }
  function prev() {
    if (current > 1) handlePageChange(current - 1);
  }
  function next() {
    if (current < itemCount) handlePageChange(current + 1);
  }
  function elevatorPrev() {
    if (current > 1) {
      const page = current - elevatorSize;
      handlePageChange(page > 0 ? page : 1);
    }
  }
  function elevatorNext() {
    if (current < itemCount) {
      const page = current + elevatorSize;
      handlePageChange(page > itemCount ? itemCount : page);
    }
  }
  return (
    <div className={styles["pagination"]}>
      <div
        className={`
          ${styles["pagination-prev-elevator"]}
          ${current === 1 && styles["pagination-disabled"]}
        `}
        onClick={elevatorPrev}>
        &lt;&lt;
      </div>
      <div
        className={`
          ${styles["pagination-prev"]}
          ${current === 1 && styles["pagination-disabled"]}
        `}
        onClick={prev}>
        &lt;
      </div>
      <div
        className={`
          ${styles["pagination-item"]}
          ${styles["pagination-item-active"]}
        `}>
        {current}
      </div>
      <div
        className={`
          ${styles["pagination-next"]}
          ${current === itemCount && styles["pagination-disabled"]}
        `}
        onClick={next}>
        &gt;
      </div>
      <div
        className={`
          ${styles["pagination-next-elevator"]}
          ${current === itemCount && styles["pagination-disabled"]}
        `}
        onClick={elevatorNext}>
        &gt;&gt;
      </div>
    </div>
  );
};
