import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import cn from 'classnames'

import * as style from './vertical-timeline.module.scss'

const Timeline = ({ header, events }) => {
  return (
    <div className={style.timeline}>
      <div className={cn("container-fluid")}>
        <div className={cn('row middle-lg')}>
          <div className={cn("col-lg-offset-1 col-lg-4 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10", style.header)}>
            <h3>{header.title}</h3>
            {header.subtitle && <p>{header.subtitle}</p>}
          </div>
          <VerticalTimeline className={"col-lg-offset-1 col-lg-12 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10"} style={{ overflow: "hidden" }}>
            {events.map(e => {
              return (
                <VerticalTimelineElement
                  key={e.id}
                  className="vertical-timeline-element--work"
                  contentStyle={e.highligthStyle}
                  contentArrowStyle={e.highligthArrowStyle}
                  dateClassName={style['date-default']}
                  date={e.date}
                  iconStyle={e.iconStyle}
                  icon={e.icon}
                >
                  <h3 className="vertical-timeline-element-title">{e.title}</h3>
                  <h4 className="vertical-timeline-element-subtitle">{e.subtitle}</h4>
                  <p> {e.description}</p>
                </VerticalTimelineElement>
              )
            })}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  )
}

export default Timeline;