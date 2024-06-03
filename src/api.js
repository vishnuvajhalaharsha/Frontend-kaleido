export async function submitReview(reviewData) {
    const url = '/api/movie-rating'; 

    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(reviewData) 
        });

        if (!response.ok) {
            
            throw new Error('Failed to submit review');
        }

        const result = await response.json(); 
        return result; 
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error; 
    }
}

export async function fetchBalance(ethAddress) {
    const url = `/api/bal/${ethAddress}`; 

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); 
        console.log(data,"data")
        return data; 
    } catch (error) {
        console.error('Failed to fetch balance:', error);
        throw error; 
    }
}
