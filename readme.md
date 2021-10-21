### Exibir alerta ao tentar adicionar todo com o mesmo nome

Para implementar o alerta ao adicionar um todo repetido o único arquivo que você precisa editar é o `Home.tsx`.

Nessa página, tudo que você precisa fazer é, na função `handleAddTask`, buscar em `tasks` um todo com o título que você deseja cadastrar (utilize a variável `newTaskTitle` e o método `find`). 

Caso já exista um todo com esse título, retorne um `Alert` com o título `Task já cadastrada` e a mensagem `Você não pode cadastrar uma task com o mesmo nome`. Caso não tenha nenhum todo cadastrado com esse título, basta seguir o fluxo normal da função `handleAddTask`.

### Exibir alerta pedindo confirmação ao remover um todo

Para implementar o alerta pedindo confirmação ao remover um todo o único arquivo que você precisa editar é o `Home.tsx`.

Nessa página, tudo que você precisa fazer é, na função `handleRemoveTask`, criar um `Alert` com duas opções: `Não` caso o usuário não queira remover o item e `Sim` caso ele queira remover o item. No caso de `Sim`, coloque no `onPress` a lógica que você já tinha no `handleRemoveTask`.

Para o título do `Alert`, utilize `Remover item` e para a mensagem `Tem certeza que você deseja remover esse item?`

### Edição todo

Para implementar a edição de um todo os arquivos que deve você editar são `Home.tsx`, `TasksList.tsx` e `TaskItem.tsx`.

Na página `Home.tsx`, você deve criar uma função chamada `handleEditTask`. Essa função receberá como argumento um objeto com duas propriedades: `taskId` será do tipo `number` e representa o `id` da `task` que você deseja editar. A segunda propriedade é a `taskNewTitle` que será do tipo `string` e representa o novo `title` que você deseja atribuir à task. Você pode utilizar a mesma lógica do `handleToogleTaskDone` (de buscar a task e atualizar um valor dela), mas lembrando de alterar a propriedade `title` em vez da `done`.

Além disso, você deve repassar essa função para o seu `TasksList` como uma prop de nome `editTask` (por enquanto vai acusar erro já que você ainda não adicionou essa função na interface  `TasksListProps`).

Agora no arquivo `TasksList.tsx`, o seu trabalho vai ser um pouquinho diferente do que você está acostumado. Em vez de só adicionar código, chegou a hora de você refatorar algumas coisas.

Então no caso desse arquivo, você deve remover algumas lógicas e estilizações para o novo componente que você irá criar: `TaskItem.tsx`. Recomendamos essa componentização para facilitar a implementação da edição e dividir melhor as responsabilidades de cada arquivo. Então vamos lá!

Comece criando o seu arquivo `TaskItem.tsx` da forma que você já está acostumado: um componente React funcional simples. Em seguida, abstraia do `TasksList.tsx` toda a lógica relacionada a um `item`, ou seja, desde o que você renderiza no `renderItem` (com exceção do `ItemWrapper`) até as funções que um `item` utiliza. Lembre das importações também.

Está com dúvida do que remover do `TasksList` para adicionar no `TaskItem`? Dê uma olhada no exemplo abaixo onde marcamos de vermelho duas partes que devem ser transferidas (outras partes também precisam ser removidas).

- Exemplo
    
    ```
    import React from 'react';
    import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps } from 'react-native';
    import Icon from 'react-native-vector-icons/Feather';
    
    import { ItemWrapper } from './ItemWrapper';
    
    import trashIcon from '../assets/icons/trash/trash.png'
    
    export interface Task {
      id: number;
      title: string;
      done: boolean;
    }
    
    interface TasksListProps {
      tasks: Task[];
      toggleTaskDone: (id: number) => void;
      removeTask: (id: number) => void;
    }
    
    export function TasksList({ tasks, toggleTaskDone, removeTask }: TasksListProps) {
      return (
        <FlatList
          data={tasks}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <ItemWrapper index={index}>
                <View>
                  <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                  >
                    <View 
                      testID={`marker-${index}`}
                      style={ item.done ? styles.taskMarkerDone : styles.taskMarker }
                    >
                      { item.done && (
                        <Icon 
                          name="check"
                          size={12}
                          color="#FFF"
                        />
                      )}
                    </View>
    
                    <Text 
                      style={ item.done ? styles.taskTextDone : styles.taskText}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
    
                <TouchableOpacity
                  testID={`trash-${index}`}
                  onPress={() => removeTask(item.id)}
                  style={{ paddingHorizontal: 24 }}
                >
                  <Image source={trashIcon} />
                </TouchableOpacity>
              </ItemWrapper>
            )
          }}
          style={{
            marginTop: 32
          }}
        />
      )
    }
    
    const styles = StyleSheet.create({
      taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
      },
      taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
      },
      taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
      },
      taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
      },
      taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
      }
    })
    ```
    

Após essa transferência para o `TaskItem.tsx`, você deve renderizar no `renderItem`, por dentro do `ItemWrapper`, o componente `TaskItem` passando todas as propriedades que ele precisa.

Para finalizar suas alterações nesse arquivo, você adicionar a tipagem da função `editTask` no seu `TasksListProps`.

No componente `TaskItem.tsx`, você deve criar dois estados e uma ref:

1. O primeiro estado é para sinalizar se o item está sendo editado ou não. Utilize o `useState` e inicie o valor dele como `false`;
2. O segundo estado é para salvar o valor editado do item. Utilize o `useState` e inicie o valor dele como `task.title` (valor original do item);
3. A referência é para você manipular manualmente se o item está sendo editado ou não. Utilize a seguinte linha para criar uma ref `const textInputRef = useRef<TextInput>(null)`

Após essa etapa, chegou a hora de criar as funções que vão lidar com as edições no seu item. Você deve criar três funções:

1. `handleStartEditing`: função responsável por iniciar a edição do item. Você deve setar como `true` o estado que indica se a edição está ocorrendo.
2. `handleCancelEditing`: função responsável por cancelar a edição e recuperar o valor original do item. Você deve setar `task.title` (valor original) no estado que armazena o valor editado do item. Além disso, sete como `false` o estado que indica se a edição está ocorrendo.
3. `handleSubmitEditing`: função responsável por confirmar a edição do item. Você deve chamar a função `editTask` passando o `task.id`  e o estado que armazena o valor editado do item. Por fim, setar como `false` o estado que indica se a edição está ocorrendo.

Para finalizar essa etapa lógica, você precisa criar um `useEffect` que irá monitorar a alteração do estado que indica se está ocorrendo a edição ou não. Se o estado for `true`, realizar o `focus` (basicamente abrir o teclado e colocar o cursor) manualmente no item para realizar a edição. Caso contrário, realizar o `blur` (fechar o teclado e retirar o cursor). 

- Exemplo
    
    ```tsx
    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])
    ```
    

Agora, é preciso realizar alterações no que está sendo renderizado pelo componente. Basicamente, você irá alterar duas seções:

1. Você irá substituir o `Text` que renderiza o título da tarefa por um `TextInput` que irá ter as seguintes propriedades:
    1.  **value**: Valor do `TextInput`. Informe nessa propriedade o estado que armazena o valor editado do item.
    2. **onChangeText**: Função que captura as alterações do `TextInput`. Informe nessa propriedade o `set` do estado que armazena o valor editado do item.
    3. **editable**: Indica se o `TextInput` aceita edições. Informe nessa propriedade o valor do estado que indica se está ocorrendo a edição.
    4. **onSubmitEditing**: Função que executa quando o usuário clica no botão de envio (confirmação) do teclado. Informe nessa propriedade a função `handleSubmitEditing`.
    5. **style**: Estilização do `TextInput`. Informe nessa propriedade a mesma estilização do `Text` segue o código: `task.done ? styles.taskTextDone : styles.taskText`
    6. **ref**: Referência para o `TextInput`. Informe nessa propriedade a referência `textInputRef` criada nos passos anteriores.
        - Exemplo de código
            
            ```tsx
            <TextInput 
              ref={textInputRef}
              style={ task.done ? styles.taskTextDone : styles.taskText}
              value={taskNewTitleValue}
              editable={isEditing}
              onChangeText={setTaskNewTitleValue}
              onSubmitEditing={handleSubmitEditing}
            />
            ```
            
2. Você irá alterar a renderização do seu ícone de lixeira (segundo `TouchableOpacity` para seguir a seguinte estrutura: uma `View` para ser o `container` dos ícones. Dentro da `View`, você terá:
    1. Uma condição baseada no estado que indica se está ocorrendo edição ou não. Se estiver ocorrendo, renderize um `TouchableOpacity` que mostra o ícone `X` e no método `onPress` informe a função `handleCancelEditing`. Caso não esteja ocorrendo a edição, renderize um `TouchableOpacity` que mostra o ícone de lápis (recomendamos exportar o ícone do layout do Figma) e no método `onPress` informe a função `handleStartEditing`.
        
        Caso tenha dúvidas de como exibir esses dois ícones na sua aplicação, dê uma olhada no exemplo abaixo. Basicamente você deve utilizar o `Icon` importado do `react-native-vector-icons` para renderizar o `X` e utilizar o `Image` passando o caminho da imagem para renderizar o lápis (você precisa exportar o ícone do Figma, mas caso tenha dúvidas dê uma olhada no vídeo de dicas)
        
    2. Uma `View` com 1 pixel de largura, 24 de altura e cor `rgba(196, 196, 196, 0.24)` para funcionar com um divisor entre os ícones.
    3. Um `TouchableOpacity` que mostra o ícone de lixeira. No método `onPress` informe a função `handleRemoveTask`. Desative o botão caso esteja editando o item (trabalhe com a prop `disabled` e o estado que informe se a edição está ocorrendo). Além disso, se o item estiver sendo editado altere o `opacity` dele para `0.2`, caso contrário deixe `1`.
        - Exemplo de código
            
            ```tsx
            <View style={ styles.iconsContainer } >
              { isEditing ? (
                <TouchableOpacity
                  onPress={handleCancelEditing}
                >
                  <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleStartEditing}
                >
                  <Image source={editIcon} />
                </TouchableOpacity>
              ) }
            
              <View 
                style={ styles.iconsDivider }
              />
            
              <TouchableOpacity
                disabled={isEditing}
                onPress={() => removeTask(task.id)}
              >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
              </TouchableOpacity>
            </View>
            ```
            
    
    Para finalizar, aplique as estilizações necessárias para o que o layout fique de acordo com o apresentado no Figma.