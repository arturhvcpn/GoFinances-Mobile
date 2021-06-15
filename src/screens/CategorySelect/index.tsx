import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { categories } from '../../utils/categories';

import { 
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
} from './styles';
import { Button } from '../../components/Forms/Button';
interface ICategory{
    key: string;
    name: string;
}

interface ICategorySelectProps{
    category: ICategory;
    setCategory: (name: ICategory) => void;
    closeSelect: () => void;
}


export function CategorySelect({
    category,
    closeSelect,
    setCategory
}:ICategorySelectProps){
    
    function handleCategorySelect(category: ICategory){
        setCategory(category)
    }

    return(
        <Container>
            <Header>
                <Title>{category.name}</Title>
            </Header>

            <FlatList 
                data={categories}
                style={{flex: 1, width:'100%'}}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => (
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon}/>
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button title={'Selecionar'} onPress={closeSelect}/>
            </Footer>
        </Container>
    );
}