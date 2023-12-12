import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, IconButton, Menu, PaperProvider } from 'react-native-paper';

const IconSelector = () => {
    const [open, setOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('credit-card-outline');

    const icons = [
        { label: 'Cartão de Crédito', value: 'credit-card' },
        { label: 'Cartão de Débito', value: 'credit-card-outline' },
        { label: 'Dinheiro', value: 'cash' },
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
                    anchor={<IconButton icon={selectedIcon} size={30} onPress={openMenu} />}
                    style={LocalStyles.menuStyle}
                >
                    {icons.map((icon) => (
                        <Menu.Item
                            title={icon.label}
                            key={icon.label}
                            leadingIcon={(props) => <Icon {...props} source={icon.value} color='purple'/>}
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
    },
    menuStyle:{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 1000,               
        marginTop: 40,
        width: 200
    },
})


export default IconSelector;
