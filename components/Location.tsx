import EventCard from './EventCard'
import LocationCard from './LocationCard'
import {  LocationFull } from '~/types'



const Location = ({ location }: {location: LocationFull}) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '2rem',
            paddingTop: '1rem'
        }}>
            <LocationCard location={location} />
            {
                location.Event.map(event => (
                    <EventCard key={event.id} event={event} />
                ))
            }

        </div>
    )
}



export default Location