import styles from "./index.less";
import { FormattedMessage, useIntl } from "react-intl";
export default (props) => {
  const {
    current = 1,
    pageSize = 10,
    total = 0,
    pagerCount = 5,
    elevatorSize = 10,
    onChange,
  } = props;
  const itemCount = Math.ceil(total / pageSize);

  function getItems() {
    const startItem = getItem(1);
    const endItem = itemCount > 1 ? getItem(itemCount) : null;
    const prevEllipsis = getEllipsisItem("prev");
    const nextEllipsis = getEllipsisItem("next");
    const items = [];
    const offset = Math.floor(pagerCount / 2);
    let startIndex = current - offset;
    let endIndex = current + offset + 1;
    if (current <= offset) endIndex = pagerCount + 1;
    if (itemCount - current < offset) startIndex = itemCount - pagerCount + 1;
    for (let i = startIndex; i < endIndex; i++) {
      if (i > 1 && i < itemCount) items.push(getItem(i));
    }
    return (
      <>
        {startItem}
        {itemCount > pagerCount + 1 && current > offset + 2
          ? prevEllipsis
          : null}
        {items}
        {itemCount > pagerCount + 1 && itemCount - current > offset + 1
          ? nextEllipsis
          : null}
        {endItem}
      </>
    );
  }
  function getEllipsisItem(type) {
    const title =
      type === "prev"
        ? `forward ${pagerCount} page`
        : `backward ${pagerCount} page`;
    return (
      <div
        title={title}
        className={styles["pagination-item-ellipsis"]}
        onClick={() => onEllipsisClick(type)}>
        •••
      </div>
    );
  }
  function getItem(page) {
    return (
      <div
        key={page}
        className={`
          ${styles["pagination-item"]}
          ${current === page && styles["pagination-item-active"]}
        `}
        onClick={() => handlePageChange(page)}>
        {page}
      </div>
    );
  }
  function onEllipsisClick(type) {
    switch (type) {
      case "prev": {
        const page = current - pagerCount;
        handlePageChange(page > 1 ? page : 1);
        break;
      }
      case "next": {
        const page = current + pagerCount;
        handlePageChange(page < itemCount ? page : itemCount);
        break;
      }
    }
  }
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
        <FormattedMessage id="PREVIOUSE" />
      </div>
      {getItems()}
      <div
        className={`
          ${styles["pagination-next"]}
          ${current === itemCount && styles["pagination-disabled"]}
        `}
        onClick={next}>
        <FormattedMessage id="NEXT" />
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
