import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MainLayout from '../../components/MainLayout'
import SearchSection from '../../components/home/SearchSection'

const Home = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <SearchSection/>
            </MainLayout>
            <Footer />
        </div>
    )
}

export default Home
