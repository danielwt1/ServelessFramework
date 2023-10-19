exports.handler = function(event, context, callback) {
  const token = event.authorizationToken.toLowerCase();
  // Objeto de acciones basado en el token.
  const tokenActions = {
    'allow': () => generatePolicy('user', 'Allow', event.methodArn),
    'deny': () => generatePolicy('user', 'Deny', event.methodArn),
    'unauthorized': () => { throw new Error("Unauthorized"); }, // Return a 401 Unauthorized response
  };
  // Si el token no está en el objeto de acciones, lanzar un error.
  if (!tokenActions.hasOwnProperty(token)) {
    throw new Error("Error: Invalid token"); // Return a 500 Invalid token response
  }

  // Ejecutar la acción correspondiente al token y pasar el resultado al callback.
  const policy = tokenActions[token]();
  callback(null, policy);
};

function generatePolicy(principalId, effect, resource) {
    const policyDocument = generatePolicyDocument(effect, resource);
    
    return {
        principalId,
        policyDocument,
        context: {
            "stringKey": "stringval",
            "numberKey": 123,
            "booleanKey": true
        }
    };
}

function generatePolicyDocument(effect, resource) {
    return {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource
        }]
    };
}
