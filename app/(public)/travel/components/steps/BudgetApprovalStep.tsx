"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface BudgetApprovalStepProps {
  data: any
  onDataChange: (data: any) => void
}

export default function BudgetApprovalStep({ data, onDataChange }: BudgetApprovalStepProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          Provide an estimated budget for your relocation. This helps us plan resources and ensures approval from the appropriate managers.
        </p>
      </Card>

      <div className="space-y-4">
        <div>
          <Label htmlFor="estimatedBudget" className="text-base font-semibold">
            Estimated Budget (USD)
          </Label>
          <p className="text-sm text-muted-foreground mb-2">What is your estimated total cost for this relocation?</p>
          <div className="relative">
            <span className="absolute left-3 top-3 text-muted-foreground">$</span>
            <Input
              id="estimatedBudget"
              type="number"
              value={data.estimatedBudget}
              onChange={(e) => onDataChange({ estimatedBudget: e.target.value })}
              placeholder="0.00"
              className="pl-7"
            />
          </div>
        </div>

        {/* Budget Breakdown */}
        <Card className="p-4 bg-muted">
          <h4 className="font-semibold mb-3">Typical Budget Items:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Transportation (flights, ground)</li>
            <li>• Accommodation (temporary/extended stay)</li>
            <li>• Moving expenses</li>
            <li>• Travel insurance</li>
            <li>• Administrative fees</li>
          </ul>
        </Card>

        {/* Approval Section */}
        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-4">Approval Requirements</h4>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="needsApproval" className="text-base">
                <div className="flex items-center gap-3">
                  <input
                    id="needsApproval"
                    type="checkbox"
                    checked={data.needsApproval}
                    onChange={(e) => onDataChange({ needsApproval: e.target.checked })}
                    className="w-4 h-4 rounded border-input"
                  />
                  <span>I need manager approval for this budget</span>
                </div>
              </Label>
              <p className="text-sm text-muted-foreground ml-7 mt-1">Check this if your budget exceeds standard relocation allowance</p>
            </div>

            {data.needsApproval && (
              <div>
                <Label htmlFor="approvalManager" className="text-base font-semibold">
                  Approval Manager
                </Label>
                <p className="text-sm text-muted-foreground mb-2">Who should approve this request?</p>
                <Input
                  id="approvalManager"
                  value={data.approvalManager}
                  onChange={(e) => onDataChange({ approvalManager: e.target.value })}
                  placeholder="Manager name or email"
                />
              </div>
            )}
          </div>
        </div>

        {/* Info Card */}
        <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            <span className="font-semibold">⚠️ Note:</span> Budgets exceeding company standards may require additional approval. You'll be notified if your request needs escalation.
          </p>
        </Card>
      </div>
    </div>
  )
}
