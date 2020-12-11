import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

class SavedRestaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: this.props.saveRestaurantReducer.restaurantList,
    };
  }

  render() {
    return (
      <FlatList
        data={this.state.selectedRestaurant}
        renderItem={({ item }) => (
          <View style={{marginVertical:12}}>
            <Text>{`Name - ${item.restaurant.location.address}`}</Text>
            <Text>{`Address - ${item.restaurant.location.address}`}</Text>
            <Text>{`Average cost - ${item.restaurant.average_cost_for_two}`}</Text>
            <Text>{`Timings - ${item.restaurant.timings}`}</Text>
          </View>
        )}
        keyExtractor={(item) => item.restaurant.id}
      />
    );
  }
}

export default SavedRestaurants;
