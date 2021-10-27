import { Injectable } from '@angular/core';
import { Issue } from './issue';
import { Issues } from './mock-issues';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private issues: Issue[] = Issues;

  constructor() {}

  getPendingIssues(): Issue[] {
    return this.issues.filter((issues) => !issues.completed);
  }

  createIssue(issue: Issue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
  }

  updateIssue(issue: Issue) {
    this.issues.forEach((i) => {
      if (i.title === issue.title) {
        i.description = issue.description;
        i.priority = issue.priority;
        i.type = issue.type;
      }
    });
  }

  completeIssue(issue: Issue) {
    const selectedIssue: Issue = {
      ...issue,
      completed: new Date(),
    };

    const index = this.issues.findIndex((i) => i === issue);
    this.issues[index] = selectedIssue;
  }

  getSuggestions(title: string): Issue[] {
    if (title.length > 3) {
      return this.issues.filter((issue) => issue.title.indexOf(title) !== -1);
    }
    return [];
  }
}
