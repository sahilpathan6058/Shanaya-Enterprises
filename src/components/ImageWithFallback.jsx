const defaultFallback = '/images/product-placeholder.svg'

function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc = defaultFallback,
  ...props
}) {
  const handleError = (event) => {
    const imageElement = event.currentTarget

    if (imageElement.src !== fallbackSrc) {
      imageElement.src = fallbackSrc
    }
  }

  return (
    <img
      src={src || fallbackSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  )
}

export default ImageWithFallback
