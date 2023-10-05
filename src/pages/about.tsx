export default function AboutPage() {
    return (
        <>

        <section className="text-gray-700 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-green-600 text-center">Welcome to SibiuEvents!</h1>
                    <h2 className="hidden lg:inline-block text-2xl font-medium text-green-600">About Us:</h2>
                    <p className="mb-8 leading-relaxed">At SibiuEvents, we are a community dedicated to people of all ages who embrace diversity and share a passion for impromptu events. We have come together as an open and friendly space where everyone has the opportunity to contribute to creating interactive experiences and connecting with others in Sibiu and its surroundings.</p>
                    <h2 className="hidden lg:inline-block text-2xl font-medium text-green-600">Who We Are:</h2>
                    <p className="mb-8 leading-relaxed">We are a diverse community, consisting of Sibiu locals and visitors alike, who share a love for unexpected moments and the desire to create events that bring people together. Whether you are sports enthusiasts, cultural aficionados, or want to host parties, you are welcome in our family.</p>
                    <h2 className="hidden lg:inline-block text-2xl font-medium text-green-600">What We Do:</h2>
                    <p className="mb-8 leading-relaxed">Diverse Events: SibiuEvents highlights a wide range of events, from sports and cultural events to parties and social experiences. These events are created by users who want to share unique experiences and build connections in the community</p>
                    <p className="mb-8 leading-relaxed">Event Promotion: If you are an organizer looking to promote an event, SibiuEvents provides you with a platform to make your initiative known and attract interested participants.</p>
                    <p className="mb-8 leading-relaxed">Community Connection: We are a place where you can find or create events that enhance interactivity and sociability. With our help, you can connect with new people and enjoy experiences together.</p>
                    
                    <h3 className="hidden lg:inline-block text-2xl font-medium text-green-600">Why Choose Us:</h3>
                    <p className="mb-8 leading-relaxed">Diversity: We are an open and friendly community dedicated to all forms of entertainment and activities that bring people together in an interactive way.</p>
                    <p className="mb-8 leading-relaxed">Endless Possibilities: You have the opportunity to promote your events or discover and join those created by others, providing you with a wide range of participation options.</p>
                    <p className="mb-8 leading-relaxed">Sibiu Community: We focus on building the Sibiu community and fostering genuine connections between residents and visitors.</p>
                    <p className="mb-8 leading-relaxed">Discovery and Interaction: We invite you to explore Sibiu and its surroundings through spontaneous events and interact with people who share similar interests.</p>

                    <h4 className="hidden lg:inline-block text-2xl font-medium text-black-600">Thank you for choosing SibiuEvents as a source of inspiration and joy in the world of impromptu events. We invite you to join our community and create or participate in unique experiences in Sibiu!</h4>
                </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img className="object-cover object-center rounded" alt="hero" src="https://images.unsplash.com/photo-1512389197797-9bbd4dd12b13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1922&q=80" />
        </div>
    </div>
</section>
<section className="text-gray-700 body-font border-t border-gray-200">
    <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">CONTACT</h2>
        </div>
        
        <div className="text-xs text-blue-500 tracking-widest font-medium title-font-underline mb-1">
        

            <a href="mailto:petrudumitru.parau@ulbsibiu.ro?&amp; "> For any questions or suggestions, click here to contact us!</a>
        </div>
    </div>
</section>
</>
)
}