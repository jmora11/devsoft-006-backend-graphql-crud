Específicación de Querys 
_________________________________

Crear usuario:

mutation {
  createUser(
    name: "Julian",
    userName: "HanK",
    password: "hank123"),
  {
    id,
    userName
  }
}
_______________________________

Consultar usuario:

query {
  getOneUser(id: 2), {
    name,
    userName,
  }
}

______________________________

Consultar todos los usuarios:

query { 
	getAllUsers {
    name,
    userName
  }
}

______________________________

Actualizar usuario:

mutation {
	updateUser(
    id: 3,
   	dataInput: {
     name: "Julian Mora",
     userName: "HanK077",
     oldPassword: "mypass",
  	 newPassword: "mypass"
  }
  ),
  {
    success,
    message
  }
}

____________________________

Eliminar usuario:

mutation {
	deleteUser(id: 2)
}

