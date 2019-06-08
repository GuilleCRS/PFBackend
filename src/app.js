const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ allowedHeaders: '*' }));

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.use(require('./rutas/cliente.js'));
app.use(require('./rutas/factura.js'));
app.use(require('./rutas/mesa.js'));
app.use(require('./rutas/menu.js'));
app.use(require('./rutas/cliente_mesa.js'));
app.use(require('./rutas/order_detalles_menu.js'));

app.listen(app.get('port'), () => {
  console.log('Servidor en puerto ', app.get('port'));
});
