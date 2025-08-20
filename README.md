[![Owner](https://img.shields.io/badge/Owner-Papangue%20Soft-blue)](https://samakunchan-technology.com/)<br>
[![Owner](https://img.shields.io/badge/Project-v0.1.0-orange)]()<br>
[![Owner](https://img.shields.io/badge/Angular-v20.1.6-%23F70000
)]()<br>
[![Owner](https://img.shields.io/badge/Node-v24.0.0-purple)]()<br>
[![Owner](https://img.shields.io/badge/NPM-v11.3.0-purple)]()<br>
# SampleAngularKeycloak

Requis : <br>
- Angular version : **v20.1.6**<br>
- Node: **24.0.0**<br>
- NPM: **11.3.0**<br>

Projet angular qui permet de faire une authentification avec keycloak. J'ai travaillé le sujet il y a quelques années, mais je n'ai jamais eu le temps de le synthétiser (et de l'utiliser).

## Installation
```shell
git clone https://github.com/samkunchan/sample-angular-keycloak.git
cd sample-angular-keycloak
yarn install
```

## Utilisation 

### Classique
```shell
ng serve
```
Serveur : http://localhost:4200

### Docker
```shell
docker compose up -d
```
Serveur : http://localhost:4210

## Reste à faire.
L'essentiel est présent, mais il y aura des corrections à faire suite aux nouvelles versions d'Angular.
1. Faire un vrai logout : j'ai du oublier de le faire à l'époque.
2. Avant, j'avais `dectectionAuthUserConnected()` et `dectectionAuthenticationToken()` qui étaient dans deux modules différents. Maintenant, ils sont aux mêmes endroits à l'initialisation et s'éxécute deux fois. Je pense qu'aujourd'hui l'initialiser initialise un de trop. J'utilise que `dectectionAuthUserConnected` pour l'instant. 
