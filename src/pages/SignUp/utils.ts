export const getInputVariant = (valid: boolean, dirty: boolean, touched: boolean) => {
  if (!valid && touched) {
    return 'error'
  }

  if (valid && dirty) {
    return 'success'
  }
}

export const getHintColor = (valid: boolean, dirty: boolean, touched: boolean) => {
  if (!valid && touched) {
    return 'text-error'
  }

  if (valid && dirty) {
    return 'text-success'
  }

  return 'text-clario-blue-400'
}
