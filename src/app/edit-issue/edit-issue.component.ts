import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css'],
})
export class EditIssueComponent implements OnInit {
  @Input() issue: Issue | null = null;
  @Output() closeEdit = new EventEmitter();

  issueForm: FormGroup | undefined;

  constructor(
    private builder: FormBuilder,
    private issueService: IssuesService
  ) {}

  ngOnInit(): void {
    this.issueForm = this.builder.group({
      title: [this.issue?.title],
      description: [this.issue?.description],
      priority: [this.issue?.priority, [Validators.required]],
      type: [this.issue?.type, [Validators.required]],
    });
  }

  editIssue() {
    this.issueService.updateIssue(this.issueForm?.value);
    this.closeEdit.emit();
  }
}
