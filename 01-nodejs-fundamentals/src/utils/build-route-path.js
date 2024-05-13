export function buildRoutePath(path) {
  // regex to identify the user route params

  const routeParametersRegex = /:([a-zA-Z]+)/g

  /*It was updated to this format because now this regex
    /\/users\/([a-z0-9-_]+)/ 
    will now be able to validate for this kind of situations, like a url
    http://localhost:3333/users/53fc9cef-216a-42a5-86db-e741afbacaef

    it will now that this is a valid test

    */

  const test = /users\/([a-z0-9-_]+)/

  /* On a regex, everything inside a () is a group
    In this case, inside the group we sent the ?<$i>, the $i, knows that, when we made the regex above, that the first
    parameter was :id, so it put the id in the place of the $i, it uses the name of the field as the group
  */
  
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  console.log(pathWithParams)
  

  //Here i'm basically saying that our string needs to start (when i start the regex with ^) with the pathWithParams regex

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
  
  return pathRegex
}