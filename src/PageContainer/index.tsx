import React, { ReactNode } from 'react';
import Footer from "../components/Footer/Footer";
import { Box, Container } from '@mui/material';

interface PageContainerProps {
    children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
    return (
        <Box sx={{ bgcolor: 'rgba(15, 15, 15, 1)' }}>
            <Container maxWidth="xl" >
            {children}
            </Container>
            <Footer />
        </Box>
    );
};

export default PageContainer;
