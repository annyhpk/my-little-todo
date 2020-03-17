import React, { useState } from "react";
import { 
    View, 
    Text,
    TextInput, 
    TouchableOpacity, 
    StyleSheet,
    Dimensions
} from "react-native";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");

export default ToDo = ({ 
        text, 
        id, 
        deleteToDo, 
        completeToDo, 
        uncompleteToDo, 
        isCompleted,
        updateToDo
    }) => {
    
    ToDo.propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        uncompleteToDo: PropTypes.func.isRequired,
        completeToDo: PropTypes.func.isRequired,
        updateToDo: PropTypes.func.isRequired
    };

    const [isEditing, setIsEditing] = useState(false);
    const [toDoValue, setToDoValue] = useState("");

    const onPressComplete = (event) => {
        if (isCompleted) {
            uncompleteToDo(id);
        } else {
            completeToDo(id);
        }
    };

    const onPressOutEditing = (event) => {
        event.stopPropagation();
        setIsEditing(true);
        setToDoValue(text);
    };

    const onPressOutEdit = (event) => {
        event.stopPropagation();
        updateToDo(id, toDoValue);
        setIsEditing(false);
    }

    const onChangeToDo = (text) => {
        event.stopPropagation();
        setToDoValue(text);
    }

    return(
        <View style={styles.container}>
            <View style={styles.column}>
            <TouchableOpacity onPress={onPressComplete}>
                <View style={[
                    styles.circle, 
                    isCompleted ? styles.completedCircle : styles.uncompletecircle
                    ]} 
                />
            </TouchableOpacity>
            {isEditing ? (
                <TextInput 
                    style={[
                        styles.input, 
                        styles.text,
                        isCompleted ? styles.completedText : styles.uncompletedText
                    ]} 
                    value={toDoValue}
                    onChangeText={onChangeToDo}
                    multiline={true}
                    returnKeyType={"done"}
                    onBlur={onPressOutEdit}
                />) 
            : (
                <Text 
                style={[
                    styles.text, 
                    isCompleted ? styles.completedText : styles.uncompletedText
                ]} 
                >
                    {text}
                </Text>
            )}
            </View>
                {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={onPressOutEdit}>
                            <View stlye={styles.actionContainer}>
                                <Text style={styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={onPressOutEditing}>
                            <View stlye={styles.actionContainer}>
                                <Text style={styles.actionText}>➕</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={(event) => {
                            event.stopPropagation();
                            deleteToDo(id);
                            }}
                        >
                            <View stlye={styles.actionContainer}>
                                <Text style={styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 25,
        borderColor: '#1ecf6a',
        borderWidth: 3,
        marginRight: 15,
        marginLeft: 5
    },
    completedCircle: {
        borderColor: '#bbb'
    },
    uncompletecircle: {
        borderColor: '#1ecf6a'
    },
    completedText: {
        color: '#bbb',
        textDecorationLine: 'line-through'
    },
    uncompletedText: {
        color: '#353839'
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 20
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width / 2
    },
    actions: {
        flexDirection: 'row'
    },
    actionContainer: {

    },
    actionText: {
        fontSize: 17,
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 15,
        width: width / 2
    }


})