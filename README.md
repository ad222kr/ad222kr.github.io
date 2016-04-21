# 1dv450-client


## Ändringar gjorda i API-t under utveckling av klient-applikation
* Vid tillägg av tag till en pub så kollar API:t först om en tag med samma namn redan finns. I så fall används den, annars skapas en ny.
* La till route och action för att kunna hämta en användarees pubar med en email-param.
  Eftersom jag sparar email i användarinfo vid inlogg så kändes det som det enklaste sättet att implentera detta då jag vill kunna ha en vy med resurser som den inloggade användaren har skapat. Borde kanske egentligen sparat användarens ID och sen skickat med id som parameter istället
