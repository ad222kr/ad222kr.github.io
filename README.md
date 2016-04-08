# 1dv450-client


## Ändringar gjorda i API-t under utveckling av klient-applikation
* Vid tillägg av tag till en pub så kollar API:t först om en tag med samma namn redan finns. I så fall används den, annars skapas en ny.
* La till route och action för att kunna hämta en användare via mail. Används efter att autentisering gjorts med jwt-token, för att få användarens id och spara i sessionen.
