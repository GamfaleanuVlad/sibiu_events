import EventCard from './EventCard'
import LocationCard from './LocationCard'
import { LocationFull } from '~/types'
import TypeCard from './TypeCard'



const Location = ({ location, showTypes }: { location: LocationFull, showTypes?: boolean }) => {

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
                !showTypes
                    ?
                    location.Event.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))
                    :
                    location.EvenTypeLocation.map(type => (
                        <TypeCard key={type.eventType.id} type={type.eventType} />
                    ))
            }

        </div>
    )
}



export default Location