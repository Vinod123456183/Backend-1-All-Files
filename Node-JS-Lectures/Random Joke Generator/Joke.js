import https from 'https'; // Change to https for secure requests
import chalk from 'chalk'; // Uncomment if you want to use chalk

const JokeFunction = () => {
    const url = 'https://official-joke-api.appspot.com/random_joke';

    https.get(url, (response) => {

        let data = '';
        
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const joke = JSON.parse(data);
                // If you want to use chalk to add some color to the output
                console.log(chalk.green(joke.setup)); 
                console.log(chalk.yellow(joke.punchline));
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });

        // Handle response error
        response.on('error', (error) => {
            console.error('Request error:', error);
        });
    
    });
};

JokeFunction();
