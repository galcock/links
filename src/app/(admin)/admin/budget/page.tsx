'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, TrendingDown, Download, PieChart, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const budgetOverview = { total: 45000000, spent: 28500000, remaining: 16500000, percentUsed: 63 };

const departments = [
  { name: 'Instruction', budget: 20000000, spent: 12500000, percent: 62.5, trend: 'up' },
  { name: 'Operations', budget: 8000000, spent: 5200000, percent: 65, trend: 'same' },
  { name: 'Transportation', budget: 5000000, spent: 3400000, percent: 68, trend: 'up' },
  { name: 'Technology', budget: 4000000, spent: 2800000, percent: 70, trend: 'down' },
  { name: 'Athletics', budget: 3000000, spent: 1800000, percent: 60, trend: 'same' },
  { name: 'Administration', budget: 5000000, spent: 2800000, percent: 56, trend: 'up' },
];

const recentTransactions = [
  { description: 'Textbook Purchase', amount: -125000, department: 'Instruction', date: 'Today' },
  { description: 'State Funding', amount: 500000, department: 'General', date: 'Yesterday' },
  { description: 'Bus Maintenance', amount: -45000, department: 'Transportation', date: '2 days ago' },
  { description: 'IT Equipment', amount: -89000, department: 'Technology', date: '3 days ago' },
];

export default function AdminBudgetPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><DollarSign className="h-8 w-8 text-admin-600" /><div><h1 className="text-3xl font-bold">Budget Management</h1><p className="text-muted-foreground">District financial overview</p></div></div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
          <Button variant="admin"><PieChart className="h-4 w-4 mr-2" />Analytics</Button>
        </div>
      </motion.div>

      {/* Budget Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card variant="admin">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center"><p className="text-sm text-muted-foreground">Total Budget</p><p className="text-3xl font-bold">${(budgetOverview.total / 1000000).toFixed(1)}M</p></div>
              <div className="text-center"><p className="text-sm text-muted-foreground">Spent</p><p className="text-3xl font-bold text-red-500">${(budgetOverview.spent / 1000000).toFixed(1)}M</p></div>
              <div className="text-center"><p className="text-sm text-muted-foreground">Remaining</p><p className="text-3xl font-bold text-green-500">${(budgetOverview.remaining / 1000000).toFixed(1)}M</p></div>
              <div className="text-center"><p className="text-sm text-muted-foreground">Fiscal Year Progress</p><p className="text-3xl font-bold">{budgetOverview.percentUsed}%</p></div>
            </div>
            <Progress value={budgetOverview.percentUsed} className="h-3 mt-6" indicatorClassName="bg-admin-500" />
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-admin-600" />Department Budgets</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {departments.map((dept, i) => (
                  <div key={i} className="p-4 rounded-xl border">
                    <div className="flex items-center justify-between mb-2">
                      <div><h4 className="font-semibold">{dept.name}</h4><p className="text-sm text-muted-foreground">${(dept.spent / 1000000).toFixed(1)}M of ${(dept.budget / 1000000).toFixed(1)}M</p></div>
                      <div className="flex items-center gap-2">
                        {dept.trend === 'up' && <TrendingUp className="h-4 w-4 text-amber-500" />}
                        {dept.trend === 'down' && <TrendingDown className="h-4 w-4 text-green-500" />}
                        <Badge variant={dept.percent > 70 ? 'warning' : 'success'}>{dept.percent}%</Badge>
                      </div>
                    </div>
                    <Progress value={dept.percent} className="h-2" indicatorClassName={dept.percent > 70 ? 'bg-amber-500' : 'bg-admin-500'} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardHeader><CardTitle className="text-sm">Recent Transactions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recentTransactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div><p className="font-medium text-sm">{tx.description}</p><p className="text-xs text-muted-foreground">{tx.department} • {tx.date}</p></div>
                    <span className={`font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {tx.amount > 0 ? '+' : ''}{(tx.amount / 1000).toFixed(0)}K
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
