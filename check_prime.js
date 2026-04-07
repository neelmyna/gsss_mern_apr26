function check_prime(user_number) {
    isPrime = true
    if(user_number < 2)
        return false
    for(let i = 2; i <= Math.ceil(Math.sqrt(user_number)); i++) {
        if (user_number % i == 0) {
            isPrime = false
            break // breaks the for loop
        }
    }
    return isPrime
}

user_number = 13
if(check_prime(user_number))
    console.log(`${user_number} is a Prime number`)
else
    console.log(user_number,' is not a Prime number')