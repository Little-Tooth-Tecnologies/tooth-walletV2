import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, IconButton, Menu, PaperProvider } from 'react-native-paper';

interface IconSelector_Props {
    color: string;
}

const IconSelector = ({...props} :IconSelector_Props) => {
    const [open, setOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('credit-card-outline');

    const icons = [
        { label: 'Cartão de Crédito', value: 'credit-card', color: props.color },
        { label: 'Cartão de Débito', value: 'credit-card-outline' , color: props.color },
        { label: 'Dinheiro', value: 'cash' , color: props.color},
    ];

    const openMenu = () => setOpen(true);
    const closeMenu = () => setOpen(false);

    const handleIconSelect = (iconName) => {
        setSelectedIcon(iconName);
        closeMenu();
    }


    return (
        <PaperProvider>
            <View style={LocalStyles.container}>
                <Menu
                    visible={open}
                    onDismiss={closeMenu}
                    anchor={<IconButton icon={selectedIcon} iconColor={props.color} size={30} onPress={openMenu} />}
                    style={LocalStyles.menuStyle}
                >
                    {icons.map((icon) => (
                        <Menu.Item
                            title={icon.label}
                            key={icon.label}
                            leadingIcon={(props) => <Icon {...props} source={icon.value} color={icon.color}/>}
                            onPress={() => handleIconSelect(icon.value)}
                            style={{gap: 20}}                          
                        />
                    ))}
                </Menu>
            </View>
        </PaperProvider>
    );
};

const LocalStyles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center', 
        zIndex: 999,                    
    },
    menuStyle:{
        position: 'absolute', 
        top: 0, 
        left: 0,    
        marginTop: 40,
        width: 200
    }
})


export default IconSelector;
