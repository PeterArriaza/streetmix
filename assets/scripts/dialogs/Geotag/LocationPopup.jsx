import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Popup } from 'react-leaflet'

const POPUP_MAX_WIDTH = 300
const POPUP_OFFSET = [0, -30]

const LocationPopup = (props) => {
  const { label, position, isEditable, isClearable, handleClear, handleConfirm } = props

  if (!position) return null

  return (
    <Popup
      position={position}
      offset={POPUP_OFFSET}
      maxWidth={POPUP_MAX_WIDTH}
      closeButton={false}
      closeOnClick={false}
    >
      <div>
        {label}
      </div>
      {(isEditable) && (
        (isClearable) ? (
          <div>
            <button className="geotag-location-button" onClick={handleClear}>
              <FormattedMessage
                id="dialogs.geotag.clear-location"
                defaultMessage="Clear location"
              />
            </button>
          </div>
        ) : (
          <div>
            <button className="geotag-location-button" onClick={handleConfirm}>
              <FormattedMessage
                id="dialogs.geotag.confirm-location"
                defaultMessage="Confirm location"
              />
            </button>
          </div>
        )
      )}
    </Popup>
  )
}

LocationPopup.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  label: PropTypes.string,
  isEditable: PropTypes.bool,
  isClearable: PropTypes.bool,
  handleConfirm: PropTypes.func,
  handleClear: PropTypes.func
}

LocationPopup.defaultProps = {
  isEditable: false,
  isClearable: false
}

export default LocationPopup
