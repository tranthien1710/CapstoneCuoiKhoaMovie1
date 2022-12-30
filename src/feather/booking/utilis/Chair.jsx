import { Button } from 'antd'
import React from 'react'
import './Chair.css'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { actionType } from '../redux/type'
const Chair = (props) => {
    const dispatch = useDispatch()
    const list_booking = useSelector(state => state.booking.List_room_ticket_booking)
    const { chair } = props
    return (

        <Button
            onClick={() => {
                dispatch({
                    type: actionType.SHOW_LIST_ROOM_TICKET_BOOKING,
                    payload: chair
                })
            }}
            className={clsx("chair", { "booking": list_booking.find(item => item.maGhe === chair.maGhe), "booked": chair.daDat })} disabled={chair.daDat} >{chair.tenGhe}</Button>

    )
}

export default Chair
