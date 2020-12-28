import React, { useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import CountUp from 'react-countup'
import numeral from 'numeral'

const AnimatedCounter = ({ countTo }) => {
  const [visible, setVisible] = useState(false);

  const onChange = (visible) => {
    setVisible(visible)
  }

  return (
    <VisibilitySensor delayedCall onChange={onChange}>
      <div>
        {visible ? (
          <CountUp
            delay={0}
            start={0}
            end={countTo}
            useEasing
            duration={2}
            formattingFn={(v) => numeral(v).format('0.0a')}
          >
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        ) : (
            <span>0</span>
          )}
      </div>
    </VisibilitySensor>
  )
}

export default AnimatedCounter
