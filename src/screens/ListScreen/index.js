import React, { useLayoutEffect } from 'react'
import { Container, AddButton, AddButtonImage, NotesList,
         NoNotes, NoNotesImage, NoNotesText } from './styles'
import NoteItem from '../../components/NoteItem'
import { useSelector} from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export default () => {

    const navigation = useNavigation()
    const list = useSelector(state => state.notes.list)


    const toEditScreen = () => navigation.navigate('EditNote')

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Suas notas',
            headerRight: () => (
                <AddButton underlayColor="transparent" onPress={toEditScreen} >
                    <AddButtonImage source={require('../../assets/more.png')}/>
                </AddButton>
            )
        })
    }, [])

    const notePressed = (index) => {
        navigation.navigate('EditNote', { key: index })
    }

    return (
        <Container>
            {list.length > 0 &&
                <NotesList data={list} keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => <NoteItem data={item} index={index} onPress={notePressed}/>}/>
            }

            { list.length == 0 &&
                <NoNotes>
                    <NoNotesImage source={require('../../assets/note.png')}/>
                    <NoNotesText>Nenhuma anotação</NoNotesText>
                </NoNotes>

            }
        </Container>
    )
}