/* eslint-env jest */
import React from 'react'
import { Variants } from '../Variants'
import { shallow } from 'enzyme'
import { IntlProvider } from 'react-intl'

import { getSegmentInfo } from '../../segments/info'
import {
  INFO_BUBBLE_TYPE_SEGMENT,
  INFO_BUBBLE_TYPE_LEFT_BUILDING,
  INFO_BUBBLE_TYPE_RIGHT_BUILDING
} from '../constants'

jest.mock('../../streets/data_model', () => {})
jest.mock('../../segments/view')
jest.mock('../../segments/info')

describe('Variants', () => {
  const intlProvider = new IntlProvider({ locale: 'en' }, {})
  const { intl } = intlProvider.getChildContext()
  it('does not render component', () => {
    const wrapper = shallow(<Variants intl={intl} />)
    expect(wrapper).toMatchSnapshot()
  })
  describe('INFO_BUBBLE_TYPE_SEGMENT', () => {
    let segment
    beforeEach(() => {
      segment = { variants: ['direction', 'public-transit-asphalt'] } // coming from info.json
      getSegmentInfo.mockImplementation(() => segment)
    })
    const type = INFO_BUBBLE_TYPE_SEGMENT
    const streetSegment = { variantString: 'inbound|regular', segmentType: 'streetcar' }
    it('renders segment type correctly', () => {
      const wrapper = shallow(<Variants intl={intl} type={type} position={0} variant={streetSegment.variantString} segmentType={streetSegment.segmentType} />)
      expect(wrapper).toMatchSnapshot()
    })
    it('onClick calls changeSegmentVariant', () => {
      const changeSegmentVariant = jest.fn()
      const wrapper = shallow(<Variants changeSegmentVariant={changeSegmentVariant} intl={intl} type={type} position={0} variant={streetSegment.variantString} segmentType={streetSegment.segmentType} />)
      wrapper.find('button').first().simulate('click')
      expect(changeSegmentVariant).toHaveBeenCalledTimes(1)
      expect(changeSegmentVariant).toHaveBeenCalledWith(0, 'direction', 'inbound')
    })
  })
  describe('INFO_BUBBLE_TYPE_LEFT_BUILDING', () => {
    const type = INFO_BUBBLE_TYPE_LEFT_BUILDING
    it('onClick calls setBuildingVariant', () => {
      const setBuildingVariant = jest.fn()
      const wrapper = shallow(<Variants setBuildingVariant={setBuildingVariant} intl={intl} type={type} position={'left'} variant={'residential'} />)
      wrapper.find('button').first().simulate('click')
      expect(setBuildingVariant).toHaveBeenCalledTimes(1)
      expect(setBuildingVariant).toHaveBeenCalledWith('left', 'waterfront')
    })
    it('renders left building correctly', () => {
      const wrapper = shallow(<Variants intl={intl} type={type} position={'left'} variant={'residential'} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('INFO_BUBBLE_TYPE_RIGHT_BUILDING', () => {
    const type = INFO_BUBBLE_TYPE_RIGHT_BUILDING
    it('onClick calls setBuildingVariant', () => {
      const setBuildingVariant = jest.fn()
      const wrapper = shallow(<Variants setBuildingVariant={setBuildingVariant} intl={intl} type={type} position={'right'} variant={'residential'} />)
      wrapper.find('button').first().simulate('click')
      expect(setBuildingVariant).toHaveBeenCalledTimes(1)
      expect(setBuildingVariant).toHaveBeenCalledWith('right', 'waterfront')
    })
    it('renders left building correctly', () => {
      const wrapper = shallow(<Variants intl={intl} type={type} position={'right'} variant={'residential'} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
