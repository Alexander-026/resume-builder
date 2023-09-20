import { Col, Row } from "antd"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  resumeBuilder,
  resumeBuilderSlice,
} from "../../features/resumeBuilder/resumeBuilderSlice"
import styles from "./ViewSections.module.scss"
import { useState } from "react"
import { IData, Section } from "../../types/form"
import classNames from "classnames"

const ViewSections = () => {
  const { form } = useAppSelector(resumeBuilder)
  const [secondaryIndex, setSecondaryIndex] = useState<number | null>(null)
  const [primaryIndex, setPrimaryIndex] = useState<number | null>(null)
  const dispatch = useAppDispatch()

  const { sortSection } = resumeBuilderSlice.actions

  const onDragStartHandler = (
    e: any,
    index: number | null,
    section: Section,
  ) => {
    if (section === "Secondary") {
      setSecondaryIndex(index)
    }

    if (section === "Primary") {
      setPrimaryIndex(index)
    }
  }

  const onDragOverHandler = (e: any) => {
    e.preventDefault()
    if (e.target.className === styles.viewBlockItem) {
      e.target.style.boxShadow = "0 2px 3px black"
    }

    if (
      e.target.parentElement.className.includes("secondary") &&
      primaryIndex !== null &&
      !form.data[primaryIndex].draggable
    ) {
      e.target.parentElement.style.background = "red"
    }
  }

  const dragLeaveHandler = (e: any) => {
    if (e.target.className === styles.viewBlockItem) {
      e.target.style.boxShadow = "none"
    }

    if (
      e.target.parentElement.className.includes("secondary") &&
      primaryIndex !== null &&
      !form.data[primaryIndex].draggable
    ) {
      e.target.parentElement.style.background = "#ffffff"
    }
  }
  const mouseLeaveHandler = (e: any) => {
    if (e.target.parentElement.className.includes("secondary")) {
      e.target.parentElement.style.background = "#ffffff"
    }
  }

  const dragEndHandler = (e: any) => {
    if (e.target.className === styles.viewBlockItem) {
      e.target.style.boxShadow = "none"
      e.target.style.cursor = "grab"
    }
    setSecondaryIndex(null)
    setPrimaryIndex(null)
  }

  const onDropSort = (e: any, index: number, item: IData) => {
    e.preventDefault()
    if (e.target.className === styles.viewBlockItem) {
      e.target.style.boxShadow = "none"
    }
    if (secondaryIndex !== null) {
      if (
        form.data[secondaryIndex].section !== item.section &&
        form.data[secondaryIndex].draggable
      ) {
        dispatch(
          sortSection({
            firstIndex: secondaryIndex,
            secondIndex: index,
            section: form.data[index].section,
          }),
        )
      } else {
        if (form.data[secondaryIndex].section === item.section) {
          dispatch(
            sortSection({
              firstIndex: secondaryIndex,
              secondIndex: index,
            }),
          )
        }
      }
    }

    if (primaryIndex !== null) {
      if (
        form.data[primaryIndex].section !== item.section &&
        form.data[primaryIndex].draggable
      ) {
        dispatch(
          sortSection({
            firstIndex: primaryIndex,
            secondIndex: index,
            section: form.data[index].section,
          }),
        )
      } else {
        if (form.data[primaryIndex].section === item.section) {
          dispatch(
            sortSection({
              firstIndex: primaryIndex,
              secondIndex: index,
            }),
          )
        }
      }
    }
    setSecondaryIndex(null)
    setPrimaryIndex(null)
  }

  return (
    <Row className={styles.view} justify="space-between" gutter={20}>
      <Col className={classNames(styles.viewBlock, "secondary")} span={11}>
        {form.data.map((item, index) => {
          if (item.section === "Secondary") {
            return (
              <div
                className={classNames(styles.viewBlockItem)}
                key={item.id}
                draggable
                onDragStart={(e) => onDragStartHandler(e, index, item.section)}
                onDragOver={(e) => onDragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => onDropSort(e, index, item)}
                onMouseLeave={(e) => mouseLeaveHandler(e)}
              >
                {item.label}
              </div>
            )
          } else {
            return null
          }
        })}
      </Col>
      <Col className={styles.viewBlock} span={11}>
        {form.data.map((item, index) => {
          if (item.section === "Primary") {
            return (
              <div
                className={styles.viewBlockItem}
                key={item.id}
                draggable
                onDragStart={(e) => onDragStartHandler(e, index, item.section)}
                onDragOver={(e) => onDragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => onDropSort(e, index, item)}
              >
                {item.label}
              </div>
            )
          } else {
            return null
          }
        })}
      </Col>
    </Row>
  )
}

export default ViewSections
