# Testing Firebase - Social Network (Laboratoria)

En este repo se muestra cómo hacer testing a firebase en el proyecto
de red social.

## Preliminares

Lo primero que debemos tener claro a la hora de testear `firebase` o cualquier librería externa a nuestro proeycto es el concepto de mocks
- Un Mock es un objeto que imita el comportamiento y/o el funcionamiento de una función/módulo/clase/etc real.

## Por qué utilizar un Mock?

Porque nuestro único objetivo es testear nuestro código y no el código de terceros. En ese sentido, al utilizar los mocks lo que garantizamos es que las funciones/módulos de terceros, funcionen tal y como lo hacen cuando los utilizamos en nuestra aplicación, pero con resultados más acotados o de los cuales vamos a poder tener el contro

## Cómo utilizar Mocks?

`Jest`, nos proporciona una forma muy simple de `mockear`. Para esto, utilizamos la función `jest.mock()` dentro de la cual ubicaremos los `mocks`.
Esta función, recibe como primer parámetro el nombre del módulo o la librería a `mockear`. De esta forma, cuando corramos nuestros tests y se haga uso de el módulo o la librería, Jest inteceptará la llamada a la librería y en su lugar, retornará lo que nosotros le indiquemos en la función que resice como segundo parámetro. Ej:

```javascript
jest.mock("firebase/auth", () => ({
  auth: jest.fn(),
}));
```

- En el ejemplo anterior, estamos `mockeando` la librería `firebase/auth`. Al correr los tests, Jest interceptará el llamado a `firebase/auth` y retornará un objeto con un único valor, es decir `auth`, la función que se muestra en el ejemplo.

## Mockeando una función específica de Firebase

Supongamos que queremos _mockear_ la función _getDocs_ que nos proporciona firebase. Al ir a la documentación, nos damos cuenta que esta función retorna una promesa que puede resolverse como exitosa o simplemente fallar. En nuestro caso, vamos a suponer que su resultado va a ser exitoso. Además, debemos tener en cuenta que esta promesa, retorna un objeto con un `id` y una función `data`.
Teniendo en cuenta todo lo anteriormente mencionado, tendríamos algo así en nuestro mock:

```javascript
    getDocs: jest.fn(()=> {
    return Promise.resolve([
      {
        id: 1,
        data: jest.fn(()=>({
          userName: 'Daniel',
          description: 'Este es un post de prueba',
          like: false,
        }))
      }
    ])
  }),
```

Si te das cuenta, la función `data` también fue mockeada.

Ahora, en lo referente al test, tendríamos algo así:

```javascript
it("calls getPosts and return the list of posts", async () => {
  const posts = await getPosts();
  expect(posts).toStrictEqual(testPosts);
});
```

Siguiendo el ejemplo:

1. Llamamos a la función getPosts. Internamente, esta función utiliza la función _getDocs_ de firebase.
2. Una vez se ejecuta, Jest interceptará el llamado a esta función y en su lugar utilizará la implementació que definimos en nuestro mock
3. Si todo sale bien, la comparación debería resolverse como verdadera
