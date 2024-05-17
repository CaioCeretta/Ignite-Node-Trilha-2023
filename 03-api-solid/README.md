#App

Gympass style app.

## FR

Reminder, the functional requirements are the application functionalities, what is going to be possible for the user to do in our app

[] - It must be possible for a user to register
[] - It must be possible for a user to authenticate
[] - It must be possible to get the profile of a logged user
[] - It must be possible to get the number of check-ins made by the user
[] - It must be possible for the user the history of check-ins
[] - It must be possible for the user to search gyms near to him
[] - It must be possible for a user to search gyms by name
[] - It must be possible for a user to check-in
[] - It must be possible to validate the check-in of a user
[] - It must be possible to register a gym


## BR

Reminder, business rules are paths that each requirement can take, so let's say that we have a fr of the user being able to do check-in, and the business rule for this functionality is that the user can ONLY make check-in if he has below 10km of the gym location.

So basically a business rule determines when or which conditions are applied for each business rule, business rules are always associated with a fr, no business rule will ever exist not linked to a fr

So we can think of br, being the ifs, that we can have in our fr.

_____________________________________________________________________________

[] - The user mustn't be able to register with a duplicated e-mail
[] - The user can't check in two times a day
[] - The user can't check in if he isn't at least 100m from the gym
[] - Check-ins can only be validated within 20 minutes of creation
[] - Check-ins can only be made my administrators
[] - Gyms can only be registered by administrators



## NFR

Reminder, these requirements aren't part of the client, he will not have control over the nfr, they are more technical requisites than functionality. These are more like, which db I will use, which language is going to be used, which strategy is going to be used for caching, pagination, or things like it

[] - User password must be encoded
[] - Application data must be stored in a PostgreSQL DB
[] - Every list of data must be paginated with only up to 20 items a page
[] - User should be identified by a JWT (JSON Web Token)