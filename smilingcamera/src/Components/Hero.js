import React from 'react'
import { Hero } from 'reactbulma'
import { Nav } from 'reactbulma'
import { Container } from 'reactbulma'
import { Button } from 'reactbulma'
import { Icon } from 'reactbulma'
import { Title } from 'reactbulma'
import { SubTitle } from 'reactbulma'
import { Tabs } from 'reactbulma'

/*
    Notas, el color azul de fondo hay que reemplazarlo con la imagen llamada tecnicamara.jpg
    en la carpeta Images, lo mejor sera usando css para importar y agregar la imagen
*/
class Portada extends React.Component {
    render(){
        return <div>
            <Hero info large>
                <Hero.Head>
                    <Nav>
                    <Container>
                        <Nav.Left>
                        <Nav.Item>
                            <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo"/>
                        </Nav.Item>
                        </Nav.Left>
                        <Nav.Toggle/>
                        
                        
                    </Container>
                    </Nav>
                </Hero.Head>
                <Hero.Body>
                    <Container hasTextCentered>
                    <Title>
                        Youprint
                    </Title>
                    <SubTitle>
                        El mejor sitio para personalizar tus regalos
                    </SubTitle>
                    </Container>
                </Hero.Body>
                <Hero.Foot>
                    <Tabs boxed fullwidth>
                    <Container>
                        <ul>
                        <li className="active"><a>Servicios</a></li>
                        <li><a>Productos</a></li>
                        <li><a>Personalizador</a></li>
                        <li><a>Mi cuenta</a></li>
                        <li><a>Carrito</a></li>
                        </ul>
                    </Container>
                    </Tabs>
                </Hero.Foot>
            </Hero>
            
        </div>
        
    }
} 

export default Portada;