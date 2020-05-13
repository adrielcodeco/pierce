export function fade (color: any, value: number) {
  color = decomposeColor(color)
  value = clamp(value)

  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a'
  }
  color.values[3] = value

  return recomposeColor(color)
}

export function decomposeColor (color: any): any {
  // Idempotent
  if (color.type) {
    return color
  }

  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color))
  }

  const marker = color.indexOf('(')
  const type = color.substring(0, marker)

  if (['rgb', 'rgba', 'hsl', 'hsla'].indexOf(type) === -1) {
    throw new Error(
      [
        `Unsupported \`${color}\` color.`,
        'We support the following formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla().'
      ].join('\n')
    )
  }

  let values = color.substring(marker + 1, color.length - 1).split(',')
  values = values.map((value: any) => parseFloat(value))

  return { type, values }
}

function clamp (value: number, min = 0, max = 1) {
  if (process.env.NODE_ENV !== 'production') {
    if (value < min || value > max) {
      console.error(
        `The value provided ${value} is out of range [${min}, ${max}].`
      )
    }
  }

  return Math.min(Math.max(min, value), max)
}

export function recomposeColor (color: any) {
  const { type } = color
  let { values } = color

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n: any, i: any) => (i < 3 ? parseInt(n, 10) : n))
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`
    values[2] = `${values[2]}%`
  }

  return `${type}(${values.join(', ')})`
}

export function hexToRgb (color: any) {
  color = color.substr(1)

  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g')
  let colors = color.match(re)

  if (colors && colors[0].length === 1) {
    colors = colors.map((n: any) => n + n)
  }

  return colors
    ? `rgb${colors.length === 4 ? 'a' : ''}(${colors
        .map((n: any, index: any) => {
          return index < 3
            ? parseInt(n, 16)
            : Math.round((parseInt(n, 16) / 255) * 1000) / 1000
        })
        .join(', ')})`
    : ''
}
