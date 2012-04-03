node server.js 
npm install jsontool

curl localhost:3000 | json

curl localhost:3000/1/dscape -X PUT | json

curl localhost:3000/1/chat/nodejs
curl localhost:3000/1/chat/thenodefirm

curl localhost:3000/1/chat/nodejs?user=randomguy \
--data '{"message": "node.js needs fibers"}' \
--header "Content-Type: application/json"
curl localhost:3000/1/chat/nodejs?user=ruby_lover_23 \
--data '{"message": "Yes, and CoffeeScript and Arrow Functions! YEAH!"}' \
--header "Content-Type: application/json"
curl localhost:3000/1/chat/nodejs?user=mikeal \
--data '{"message": "no no no no no no no no no"}' \
--header "Content-Type: application/json"
curl localhost:3000/1/chat/thenodefirm?user=dscape \
--data '{"message": "and here they go again. rewind, repeat"}' \
--header "Content-Type: application/json"
curl localhost:3000/1/chat/nodejs?user=ruby_lover_23 \
--data '{"message": "whatever, i want my ruby in your javascript"}' \
--header "Content-Type: application/json"
curl localhost:3000/1/chat/nodejs?user=randomguy \
--data '{"message": "why do you say that mikeal?"}' \
--header "Content-Type: application/json"
curl localhost:3000/1/chat/nodejs?user=randomguy \
--data '{"message": "this was general consensus at fluent"}' \
--header "Content-Type: application/json"
echo 