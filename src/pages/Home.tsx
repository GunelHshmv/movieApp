import React from "react";
import PageContainer from "../PageContainer";
import NavbarComponent from "../components/Navbar";

const Home:React.FC = () => {
        const handleFilterChange = () => {
            console.log('navbar')
          };
    return <PageContainer>
            <NavbarComponent onFilterChange={handleFilterChange} />
       <div style={{height:'100vh'}}>
        Home
       </div>

    </PageContainer>;
}

export default Home;