import React from 'react';
import { Container, } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import NoAccess from '../LandingPages/NoAccess';
import LoadingPage from '../LandingPages/LoadingPage';
import { useUser } from '../../context/UserContext';

export default function UserDashboard() {
    const { user, loading: authLoading } = useAuth();
    const { userProfile, isLoading: profileLoading } = useUser();

    if (!user && !authLoading && !profileLoading) {
        return <NoAccess />;
    }

    if (authLoading || profileLoading) {
        return <LoadingPage />;
    }

    return user?(
        <Container className="p-5 my-5 rounded text-center">
            <h1 className='text-center mb-3'>{userProfile?.firstName || user?.email?.split('@')[0] || 'User'}'s Dashboard!</h1>
                <iframe
                    src="https://30days.streamlit.app?embed=true"
                    style={{height: "1200px", width: "1200px"}}
                ></iframe>
        </Container>
):null;
}

// Investment Simulator
// fetch("http://localhost:5000/simulate_portfolio", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       amount: 10000,
//       tickers: ["AAPL", "MSFT"],
//       allocations: { "AAPL": 60, "MSFT": 40 },
//       start_date: "2010-01-01",
//       end_date: "2020-01-01"
//     })
//   }).then(res => res.json()).then(data => console.log(data));

// Loan Assessment
// fetch("http://localhost:5000/assess_loan_risk", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       loan_amount: 10000,
//       loan_term: 10,
//       interest_rate: 5,
//       credit_score: 700,
//       annual_income: 50000,
//       monthly_debt: 800
//     })
//   }).then(res => res.json()).then(data => console.log(data));