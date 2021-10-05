import React, { useState, useEffect } from 'react'
import { useSpring, animated as a } from 'react-spring'
import { useHistory } from 'react-router-dom'
import { interpolate } from 'flubber'
import { Languages, TypographySVG } from '../components'
import { getRadialAreaData } from '../utils/getRadialAreaData'
import {
  initialTypographyStates,
  typographyState,
} from '../utils/typographyState'
import styles from './KineticTypography.module.css'
import { Play } from '../assets/icons'
import {
  ReactLogo,
  D3Logo,
  ReduxLogo,
  JestLogo,
  WebpackLogo,
  PythonLogo,
} from '../assets/logos'

const KineticTypography = () => {
  const width = window.innerWidth,
    height = window.innerHeight

  const history = useHistory()

  const [{ paths, innerRadius }] = useState(() =>
    getRadialAreaData(width, height)
  )

  const [startAnimation, setStartAnimation] = useState(false)
  const [anim, setAnim] = useSpring(() => ({
    ...initialTypographyStates,
  }))

  useEffect(() => {
    if (startAnimation)
      setAnim({
        to: [
          ...typographyState,
          {
            dummyVal: 15,
            onRest: () => {
              history.push('/')
            },
          },
        ],
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation])

  const interpolator = interpolate(paths[0], paths[1])

  const languagesPages = [
    {
      logo: ReactLogo,
      alt: 'React logo',
      text: 'React',
      left: anim.reactLeft,
      opacity: anim.reactOpacity,
      color: '#61DAFB',
    },
    {
      logo: D3Logo,
      alt: 'D3 logo',
      text: 'D3.js',
      left: anim.d3Left,
      opacity: anim.d3Opacity,
      color: 'orange',
    },
    {
      logo: ReduxLogo,
      alt: 'Redux logo',
      text: 'Redux',
      left: anim.reduxLeft,
      opacity: anim.reduxOpacity,
      color: '#8044C3',
    },
    {
      logo: WebpackLogo,
      alt: 'Webpack logo',
      text: 'Webpack',
      left: anim.webpackLeft,
      opacity: anim.webpackOpacity,
      color: '#8ED5FA',
    },
    {
      logo: JestLogo,
      alt: 'Jest logo',
      text: 'Jest',
      left: anim.jestLeft,
      opacity: anim.jestOpacity,
      color: '#C63D16',
    },
    {
      logo: PythonLogo,
      alt: 'Python logo',
      text: 'Python',
      left: anim.pythonLeft,
      opacity: anim.pythonOpacity,
      color: '#FFD13C',
    },
  ]

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') setStartAnimation(true)
  }

  return (
    <div className={styles.parentContainer}>
      <a.div
        className={styles.container}
        style={{
          position: 'absolute',
          left: anim.baseLeft.interpolate((x) => `${x}vw`),
          opacity: anim.baseOpacity,
        }}>
        <TypographySVG
          width={width}
          height={height}
          anim={anim}
          innerRadius={innerRadius}
          interpolator={interpolator}
        />
        <a.p
          className={styles.text}
          style={{
            transform: anim.transform.interpolate(
              (x, y, s) => `translate(${x}px, ${y}px) scale(${s})`
            ),
            opacity: anim.opacity,
            userSelect: anim.opacity.interpolate((x) =>
              x === 0 ? 'none' : 'text'
            ),
          }}>
          {anim.text}
        </a.p>
        <a.img
          className={styles.start}
          src={Play}
          alt="Start tldr;"
          title="Click to know more about me"
          tabIndex="1"
          onKeyPress={handleKeyPress}
          onClick={() => setStartAnimation(true)}
          style={{
            opacity: anim.playOpacity,
            userSelect: anim.playOpacity.interpolate((x) =>
              x === 0 ? 'none' : 'text'
            ),
          }}
        />
        <a.p
          className={styles.bottomText}
          style={{
            opacity: anim.bottomTextOpacity,
            userSelect: anim.bottomTextOpacity.interpolate((x) =>
              x === 0 ? 'none' : 'text'
            ),
            color: anim.bottomTextColor,
          }}>
          {anim.bottomText}
        </a.p>
      </a.div>
      {languagesPages.map((language, i) => (
        <Languages key={i} {...language} />
      ))}
    </div>
  )
}

export default KineticTypography
