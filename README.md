# Envia WhatsApp

Enviar mensajes de WhatsApp a partir de una planilla de Excel

Hay que tener instalado el WS Desktop

La planilla tiene que tener estas columnas:
A: Nro de telefono
B: Nombre del contacto
C: Mensaje a enviar
D: nada, en blanco (o cualquier cosa; no se tiene en cuenta)
E: link al api de whatsapp. Así: https://api.whatsapp.com/send?phone=5411-542-00776&text=Hola%20Diego…!!!

El link se puede armar en Excel con la función CONCATENAR. Noten que no se pueden incluir espacios en blanco. Los mismos deben ser reemplazados por %20
Eso se puede hacer con la función sustituir, así: =+SUSTITUIR(C2;" ";"%20") en C2 está el mensaje escrito normalmente, y esa formula se carga en una columna auxiliar, F por ejemplo
Luego, para armar el url, lo hago así:
=+CONCATENAR("https://api.whatsapp.com/send?phone=";CONCATENAR("54";TEXTO(A2;"0000000000"));"&text=Hola ";B2;"…!!!%20";F2)) donde en A2 está el teléfono, en B2 el nombre, y en F2 el texto con la función SUSTITUIR aplicada.
