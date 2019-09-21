import React from 'react'
import { Hero } from 'reactbulma'
import { Nav } from 'reactbulma'
import { Container } from 'reactbulma'
import { Button } from 'reactbulma'
import { Icon } from 'reactbulma'
import { Title } from 'reactbulma'
import { SubTitle } from 'reactbulma'
import { Tabs } from 'reactbulma'
import Showecommerceheader from './EcommerceHeader.js'
import Showecommercemenu from './EcommerceMenu.js'
import Showecommercefooter from './EcommerceFooter.js'
/*
    Notas, el color azul de fondo hay que reemplazarlo con la imagen llamada tecnicamara.jpg
    en la carpeta Images, lo mejor sera usando css para importar y agregar la imagen
*/
class Portada extends React.Component {
    render(){
        return <div>
            <Showecommerceheader></Showecommerceheader>
            <Showecommercemenu></Showecommercemenu>     
            <Hero info large>
                <Hero.Head>
                    <Nav>
                   
                    <Container>
                        <Nav.Left>
                        <Nav.Item>
                            
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
                    <Tabs boxed fullwidth>
                    <Container>
                        
                    </Container>
                    </Tabs>
                </Hero.Body>
                <Hero.Foot>
                    
                </Hero.Foot>
            </Hero>
            <Showecommercefooter></Showecommercefooter>
        </div>
        
    }
} 

export default Portada;