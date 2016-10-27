A few http exceptions are already integrated into the framework.

You should use them if you are building a REST api for example.

## BadRequest (http 400)
Use this exception to reply to malformatted input for example:
```
throw new \Nf\Error\Exception\Http\BadRequest($errorsArray)
```
The $errorsArray will be converted to json and outputted as the response.

## Forbidden (http 403)
Use this exception to reply that a route or an object is forbidden for this user.
```
throw new \Nf\Error\Exception\Http\Forbidden()
```
This one does not accept any parameters.

## Gone (http 410)
Use this exception to reply that a route or an object has been removed indefinitely. You should use this in SEO for example for pages that you removed forever.
```
throw new \Nf\Error\Exception\Http\Gone()
```
This one does not accept any parameters.

## InternalServerError (http 500)
This exception will indicate that a server error has occured. 
```
throw new \Nf\Error\Exception\Http\InternalServerError()
```
This one does not accept any parameters.

## NoContent (http 204)
This exception (although in the 200 range) indicates that the request has been treated successfully but does not need to reply anything.
```
throw new \Nf\Error\Exception\Http\NoContent()
```
This one does not accept any parameters.

## NotFound (http 404)
This exception indicates that the object or route was not found.
```
throw new \Nf\Error\Exception\Http\NotFound()
```
This one does not accept any parameters.

## Unauthorized (http 401)
This exception indicates that the access to the route or object was denied, for example you should throw this exception when you expect the user to log in.
```
throw new \Nf\Error\Exception\Http\Unauthorized()
```
This one does not accept any parameters.