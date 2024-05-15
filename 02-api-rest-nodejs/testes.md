  /*
  Tests
  
  Unit Tests: They test a single unit of our application in isolated ways.

  So let's say we have a function to format dates in a certain way we utilize in our whole application, so we created an
  util, and we can get that small function and test it by herself, passing a parameter and verify if the return is the
  expected return. We are not testing where it's been utilized, or if on the route that list that the dates, the function
  returned correctly.

  ______________________________________--

  Integration Tests: 

  When we test the integration between two or more units, if we have a function that calls another function that calls
  another function, and so on
  
  ____________________________________________

  E2E - Simulate a user operating in our application, they are basically the integration testes, they are going to test
  everything a user would do in our application. They will test from the route to the db
  
  __________________________________________
  
  Tests Pyramid - 

  One common test is the E2E, because they don't depend on a technonology, or a data structure or anything, any people
  can write end to end tests
  indifferent of frameworks, technologies, or something

  The reason why we don't utilize only those tests, is that because those tests simulate the end user, the call http, the database
  and all of that, they are very slow tests.

  but on our tests pyramid the base of it are the unit tests, because they are way more numerous in our application, then the
  integration and then the e2e

  */