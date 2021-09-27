import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Container, TitleInput, BodyInput, SaveButton, SaveButtonImage,
         CloseButton, CloseButtonImage, DeleteButton, DeleteButtonText } from './styles'

export default () => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [status, setStatus] = useState('new')

    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const list = useSelector(state => state.notes.list)

    useEffect(() => {

        if (route.params?.key != undefined && list[route.params.key]) {
            setStatus('edit')
            setTitle(list[route.params.key].title)
            setBody(list[route.params.key].body)
        }
    }, [])


    const onSavingNote = () => {

        if (title == '' || body == '')
            return alert(`Preencha título e corpo.`)

        if (status == 'edit') {
            dispatch({
                type: 'EDIT_NOTE',
                payload: {
                    key: route.params.key,
                    title,
                    body
                }
            })
        } else {
            dispatch({
                type: 'ADD_NOTE',
                payload: { title, body }
            })
        }

        navigation.goBack()
    }

    const onClosing = () => navigation.goBack()

    useLayoutEffect(() => {

        navigation.setOptions({
            title: status == 'new' ? 'Nova Anotação' : 'Editar Anotação',
            headerRight: () => (
                <SaveButton underlayColor="transparent" onPress={onSavingNote}>
                    <SaveButtonImage source={require('../../assets/save.png')}/>
                </SaveButton>
            ),
            headerLeft: () => (
                <CloseButton underlayColor='transparent' onPress={onClosing}>
                    <CloseButtonImage source={require('../../assets/close.png')}/>
                </CloseButton>
            )

        })

    }, [status, title, body])

    const onDeleting = () => {

        dispatch({
            type: 'DEL_NOTE',
            payload: { key: route.params.key }
        })

        navigation.goBack()
    }

    return (
        <Container>
            <TitleInput 
            placeholder="Digite o título da anotação" 
            placeholderTextColor="#ccc"
            onChangeText={(txt) => setTitle(txt)}
            autoFocus
            value={title}
            />
            <BodyInput 
            placeholder="Digite o corpo da anotação" 
            placeholderTextColor="#ccc"
            multiline 
            textAlignVertical='top'
            onChangeText={(txt) => setBody(txt)}
            value={body}
            />
            {status == 'edit' &&
                <DeleteButton underlayColor="transparent" onPress={onDeleting}>
                    <DeleteButtonText>Excluir Tarefa</DeleteButtonText>
                </DeleteButton>
            }
        </Container>
    )
}