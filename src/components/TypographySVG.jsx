import React from 'react'
import { animated as a } from 'react-spring'
import styles from './TypographySVG.module.css'

const Label = ({ x, y, text }) => {
  return (
    <text
      transform={`translate(${ x }, ${ y })`}
      dominantBaseline='middle'
      textAnchor='middle'
      fill='#999999'
      fontSize='2.4vmin'
      fontWeight='600'
    >
      { text }
    </text>
  )
}

const TypographySVG = ({ width, height, anim, innerRadius, interpolator }) => {
  const w = width / 2,
        h = height / 2

  const labels = [
    {
      x: w,
      y: h - innerRadius + 20,
      text: '00'
    },
    {
      x: w + innerRadius - 20,
      y: h,
      text: '06'
    },
    {
      x: w,
      y: h + innerRadius - 20,
      text: '12'
    },
    {
      x: w - innerRadius + 20,
      y: h,
      text: '18'
    },
  ]
  return (
    <svg
      className={styles.svg}
      width='100%' height='100%'
      viewBox={`0, 0, ${width}, ${height}`} preserveAspectRatio='xMidYMid meet'
    >
        <defs>
          <radialGradient id='coolBlue'>
            <stop offset='50%' stopColor='#0061ff' />
            <stop offset='95%' stopColor='#60efff' />
          </radialGradient>
        </defs>

        {/* REVEAL CIRCLE */}
        <a.circle
          cx={w}
          cy={h}
          r={anim.r}
          fill='#fafafa'
        />

        {/* RADIAL AREA - X LABELS */}
        <a.g style={{ opacity: anim.radialAreaX }}>
        {
          labels.map((label, i) => (
            <Label
              key={i}
              { ...label }
            />
          ))
        }
        </a.g>

        {/* RADIAL AREA */}
        <a.path
          transform={`translate(${w}, ${h})`}
          fill='url(#coolBlue)'
          d={anim.chartPath.interpolate(interpolator)}
          style={{
            opacity: anim.chartOpacity
          }}
        />

        {/* RADIAL AREA - TITLE */}
        <a.foreignObject
          x={width / 2 - ((innerRadius * 2 - 150) / 2)}
          y={height / 2 - ((innerRadius * 2 - 150) / 2)}
          width={ innerRadius * 2 - 150 }
          height={ innerRadius * 2 - 150 }
          style={{
            textAlign: "center",
            opacity: anim.radialAreaLabel
          }}
        >
          <div className={styles.radialAreaLabel} xmlns="http://www.w3.org/1999/xhtml">
            My music listening pattern in
            <p className={styles.styledLabel}>2020</p>
          </div>
        </a.foreignObject>
      </svg>
  )
}

export default TypographySVG