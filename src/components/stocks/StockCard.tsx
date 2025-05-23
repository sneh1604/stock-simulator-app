import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, shadows, spacing } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../../utils/helpers';
import { usdToInr } from '../../utils/currencyConverter';
import { darkColors } from '../../theme/darkTheme';

interface StockCardProps {
  stock: {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    name?: string;  // Optional company name
  };
  onPress?: () => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onPress }) => {
  const isPositive = stock.change >= 0;
  
  // Convert USD to INR for displaying
  const inrPrice = usdToInr(stock.price);
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.container, { backgroundColor: darkColors.surface }]}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <Text style={[styles.symbol, { color: darkColors.text }]}>{stock.symbol}</Text>
        {stock.name && <Text style={[styles.name, { color: darkColors.textSecondary }]} numberOfLines={1}>{stock.name}</Text>}
      </View>
      <View style={styles.rightContent}>
        <Text style={[styles.price, { color: darkColors.text }]}>{formatCurrency(inrPrice)}</Text>
        <View style={[
          styles.changeContainer, 
          isPositive ? { backgroundColor: darkColors.profit + '20' } : { backgroundColor: darkColors.loss + '20' }
        ]}>
          <Ionicons 
            name={isPositive ? "caret-up" : "caret-down"} 
            size={12} 
            color={isPositive ? darkColors.profit : darkColors.loss} 
            style={styles.icon}
          />
          <Text style={[
            styles.change,
            isPositive ? { color: darkColors.profit } : { color: darkColors.loss }
          ]}>
            {Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.medium,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    marginVertical: spacing.small,
    borderLeftWidth: 4,
    borderLeftColor: darkColors.primary,
  },
  leftContent: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: typography.fontSizes.medium,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 2,
  },
  name: {
    fontSize: typography.fontSizes.small,
    color: colors.gray,
    maxWidth: 180,
  },
  price: {
    fontSize: typography.fontSizes.medium,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  positiveContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  negativeContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  icon: {
    marginRight: 2,
  },
  change: {
    fontSize: typography.fontSizes.small,
    fontWeight: "medium",
  },
  positive: {
    color: colors.profit,
  },
  negative: {
    color: colors.loss,
  },
});

export default StockCard;